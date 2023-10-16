import { supabase } from "db/supabase/supabase";
import { useEffect, useState } from "preact/hooks";
import type { InsuredEmploye } from "components/InsuredEmployees/View";
import type { Organization } from "components/Organizations";

type RiskCategory = "LowRisk" | "MediumRisk" | "ModerateRisk" | "HighRisk" | "VeryHighRisk"

export const useInsuredEmployeeForm = (
  cancelEdit: () => void,
  toBeEdited?: InsuredEmploye
) => {
  console.log('form rerender');
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [riskCategory, setRiskCategory] = useState<RiskCategory>();
  const [organizationId, setOrganizationId] = useState<number>(0);
  const [organizationName, setOrganizationName] = useState<string>();
  const [organizations, setOrganizations] = useState<Organization[]>();

  useEffect(() => {
    if (toBeEdited) {
      setFullName(toBeEdited.fullName);
      setAge(toBeEdited.age);
      setRiskCategory(toBeEdited.riskCategory);
      setOrganizationId(toBeEdited.organizationId);
      setOrganizationName(toBeEdited.Organization.fullName);
    }
  }, [toBeEdited]);

  useEffect(() => {
    supabase.from('Organization').select('*').then(response => { console.log('response', response), setOrganizations(response.data ?? []) })
  }, [])

  const changeFullName = (e: Event) => {
    setFullName((e.target as HTMLInputElement).value);
  };

  const changeAge = (e: Event) => {
    setAge(Number((e.target as HTMLInputElement).value));
  };

  const changeRiskCategory = (e: Event) => {
    setRiskCategory((e.target as HTMLInputElement).value as RiskCategory);
  };

  const changeOrganizationId = (e: Event) => {
    setOrganizationId(Number((e.target as HTMLInputElement).value));
  };

  const changeOrganizationName = (e: Event) => {
    setOrganizationName((e.target as HTMLInputElement).value);
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    if (fullName && age && riskCategory && organizationId) {
      const data = {
        fullName,
        age,
        riskCategory,
        organizationId,
      };

      console.log('data:', data)

      if (toBeEdited) {
        await supabase.from('InsuredEmploye').update(data).eq("id", toBeEdited.id);
      } else {
        await supabase.from('InsuredEmploye').insert(data);
      }

      cancelEdit();

      setFullName('');
      setAge(0);
      setRiskCategory(undefined);
      setOrganizationId(0);
    }
  };

  return {
    onSubmit,
    fullName,
    changeFullName,
    age,
    changeAge,
    riskCategory,
    changeRiskCategory,
    organizationId,
    organizationName,
    changeOrganizationName,
    changeOrganizationId,
    organizations,
  };
};
