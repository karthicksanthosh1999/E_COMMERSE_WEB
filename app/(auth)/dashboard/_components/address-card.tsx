import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Plus } from 'lucide-react';
import React from 'react'

const AddressCard = () => {
  return (
    <Card>
      <CardHeader className='flex items-center gap-2 justify-between'>
        <CardTitle className='flex items-center gap-2'>
            <MapPin size={25} className='text-brand-gold' />
            <h3 className="font-display text-xl font-bold text-brand-burgundy-dark">Address</h3>
        </CardTitle>
        <Button type='button' variant={'link'} className={'cursor-pointer'}><Plus/> Add</Button>
      </CardHeader>
      <CardContent>
        
      </CardContent>
    </Card>
  )
}

export default AddressCard
