import type { Organization } from "components/Organizations";
import { supabase } from "db/supabase/supabase";
import { useEffect, useState } from "preact/hooks";


export const useOrganizationsForm = (cancelEdit: () => void, toBeEdited?: Organization) => {
  console.log('form rerender')
  const [address, setAddress] = useState<string>('');
  const [bankNumber, setBankNumber] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [shortName, setShortName] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');

  useEffect(() => {
    if (toBeEdited) {
      setAddress(toBeEdited.address)
      setBankNumber(toBeEdited.bankNumber)
      setCode(toBeEdited.code)
      setFullName(toBeEdited.fullName)
      setShortName(toBeEdited.shortName)
      setSpecialization(toBeEdited.specialization)
    }
  }, [toBeEdited])


  const changeAddress = (e: Event) => {
    setAddress((e.target as HTMLInputElement).value);
  };

  const changeBankNumber = (e: Event) => {
    setBankNumber((e.target as HTMLInputElement).value);
  };

  const changeCode = (e: Event) => {
    setCode((e.target as HTMLInputElement).value);
  };

  const changeFullName = (e: Event) => {
    setFullName((e.target as HTMLInputElement).value);
  };

  const changeShortName = (e: Event) => {
    setShortName((e.target as HTMLInputElement).value);
  };

  const changeSpecialization = (
    e: Event,
  ) => {
    setSpecialization((e.target as HTMLInputElement).value);
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const data = {
      address,
      bankNumber,
      code,
      fullName,
      shortName,
      specialization,
    }
    if (toBeEdited) {
      await supabase.from('Organization').update(data).eq("id", toBeEdited.id!)
    } else {
      await supabase.from('Organization').insert(data)
    }
    cancelEdit()

    setAddress('')
    setBankNumber('')
    setCode('')
    setFullName('')
    setShortName('')
    setSpecialization('')
  };

  return {
    onSubmit,
    address,
    changeAddress,
    bankNumber,
    changeBankNumber,
    code,
    changeCode,
    changeFullName,
    fullName,
    shortName,
    changeShortName,
    specialization,
    changeSpecialization
  }
}