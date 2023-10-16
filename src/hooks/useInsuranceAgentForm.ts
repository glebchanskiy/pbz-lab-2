import { useEffect, useState } from "preact/hooks";
import { supabase } from "db/supabase/supabase";
import type { InsuranceAgent } from "@prisma/client";

export const useInsuranceAgentForm = (
  cancelEdit: () => void,
  toBeEdited?: InsuranceAgent
) => {
  console.log('form rerender');
  const [fullName, setFullName] = useState<string>('');
  const [passportData, setPassportData] = useState<string>('');
  useEffect(() => {
    if (toBeEdited) {
      setFullName(toBeEdited.fullName);
      setPassportData(toBeEdited.passportData);
    }
  }, [toBeEdited]);
  const changeFullName = (e: Event) => {
    setFullName((e.target as HTMLInputElement).value);
  };
  const changePassportData = (e: Event) => {
    setPassportData((e.target as HTMLInputElement).value);
  };
  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const data = {
      fullName,
      passportData,
    };
    if (toBeEdited) {
      await supabase.from('InsuranceAgent').update(data).eq("id", toBeEdited.id!);
    } else {
      await supabase.from('InsuranceAgent').insert(data);
    }

    cancelEdit();

    setFullName('');
    setPassportData('');
  };
  return {
    onSubmit,
    fullName,
    changeFullName,
    passportData,
    changePassportData,
  };
};