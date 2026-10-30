"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Pencil,
  X,
  Check,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import api from "@/lib/axios";

interface UserProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [formData, setFormData] = useState<UserProfileData | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch the authenticated user's profile.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const { data } = await api.get(`/api/auth/me`);
        
        // Adjust this mapping to match your actual API response.
        const profile: UserProfileData = data;

        setUser(profile);
        setFormData(profile);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) =>
      previous ? { ...previous, [name]: value } : previous
    );
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/users/profile`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update your profile."
        );
      }

      const updatedProfile: UserProfileData = result.data;

      setUser(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#781F3A]" />
      </div>
    );
  }

  if (!user || !formData) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <UserRound className="mx-auto mb-4 size-12 text-[#8C7858]" />

        <h2 className="text-xl font-semibold text-[#781F3A]">
          Unable to load your profile
        </h2>

        <p className="mt-2 text-sm text-stone-600">
          {error || "Please sign in and try again."}
        </p>

        <Button
          className="mt-5 bg-[#781F3A] hover:bg-[#5F172E]"
          onClick={() => {
            window.location.href = "/account";
          }}
        >
          Go to Account
        </Button>
      </div>
    );
  }

  const initials =
    `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      .toUpperCase();

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C7858]">
            My Account
          </p>

          <h1 className="mt-2 font-[var(--font-playfair)] text-3xl font-bold text-[#781F3A] sm:text-4xl">
            Personal Profile
          </h1>

          <p className="mt-2 text-sm text-stone-600">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden rounded-2xl border-[#E9E0D4] bg-white shadow-sm">

          {/* Profile Header */}
          <div className="bg-[#781F3A] px-6 py-8 text-white sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                <Avatar className="size-16 border-2 border-[#D9AC48]">
                  <AvatarFallback className="bg-[#FAF7F0] text-xl font-bold text-[#781F3A]">
                    {initials || "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>

                  <p className="mt-1 text-sm text-white/75">
                    {user.email}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#FDF2C0]">
                    <ShieldCheck className="size-4" />
                    Account Profile
                  </div>
                </div>
              </div>

              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData(user);
                    setIsEditing(true);
                    setSuccess("");
                    setError("");
                  }}
                  className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Pencil className="mr-2 size-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <CardHeader className="px-6 pt-7 sm:px-8">
            <CardTitle className="text-lg text-[#781F3A]">
              Personal Information
            </CardTitle>

            <CardDescription>
              {isEditing
                ? "Update your details below and save your changes."
                : "Your personal information associated with your account."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-6 pb-8 sm:px-8">

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                {success}
              </div>
            )}

            {/* First and Last Name */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C7858]" />

                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                    className="h-11 border-[#E9E0D4] pl-10 focus-visible:ring-[#781F3A]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>

                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing || isSaving}
                  className="h-11 border-[#E9E0D4] focus-visible:ring-[#781F3A]"
                  required
                />
              </div>
            </div>

            <Separator className="bg-[#E9E0D4]" />

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C7858]" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="h-11 border-[#E9E0D4] bg-stone-50 pl-10"
                />
              </div>

              <p className="text-xs text-stone-500">
                Contact support if you need to change your email address.
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C7858]" />

                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing || isSaving}
                  placeholder="Enter your phone number"
                  className="h-11 border-[#E9E0D4] pl-10 focus-visible:ring-[#781F3A]"
                />
              </div>
            </div>

            {/* Actions */}
            {isEditing && (
              <div className="flex flex-col-reverse gap-3 border-t border-[#E9E0D4] pt-6 sm:flex-row sm:justify-end">

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="border-[#E9E0D4] text-stone-700"
                >
                  <X className="mr-2 size-4" />
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-[#781F3A] text-white hover:bg-[#5F172E]"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 size-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-5 text-center text-xs text-stone-500">
          Your information is used to manage your VASTRA account and orders.
        </p>
      </div>
    </main>
  );
}