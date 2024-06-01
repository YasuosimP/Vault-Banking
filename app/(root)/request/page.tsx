import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import CheckbookRequestForm from '@/components/CheckbookRequestForm';

const page = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;

  return (
    <section className="payment-transfer">
    <HeaderBox 
      title="Demande de chéquier"
      subtext="saissisez les détails de chéquier"
    />

<section className="size-full pt-5">
       <CheckbookRequestForm accounts={accountsData}/>
      </section>
    </section>
  )
}

export default page
