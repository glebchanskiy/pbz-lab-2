import type { RiskCategory } from "@prisma/client";
import ButtonPrimary from "components/commons/ButtonPrimary";
import { useInsuredEmployeeForm } from "src/hooks/useInsuredEmployeeForm";
import type { InsuredEmploye } from "./View";

type FormProps = {
  editInsuredEmployee?: InsuredEmploye;
  cancelEdit: () => void;
};

// export interface InsuredEmployee {
//   id: number;
//   fullName: string;
//   age: number;
//   riskCategory: string;
//   organizationId: number;
// }

const risks: { value: RiskCategory; label: string }[] = [
  { value: "LowRisk", label: "Low risk" },
  { value: "ModerateRisk", label: "Moderate risk" },
  { value: "MediumRisk", label: "Medium risk" },
  { value: "HighRisk", label: "High risk" },
  { value: "VeryHighRisk", label: "Very high risk" },
];

export const Form = (props: FormProps) => {
  console.log("render form");
  console.log(props);
  const {
    onSubmit,
    fullName,
    changeFullName,
    age,
    changeAge,
    riskCategory,
    changeRiskCategory,
    organizationId,
    changeOrganizationId,
    changeOrganizationName,
    organizations,
  } = useInsuredEmployeeForm(props.cancelEdit, props.editInsuredEmployee);
  console.log("organizations", organizations);
  return (
    <form className="w-120 mt-8 flex flex-wrap gap-2" onSubmit={onSubmit}>
      <div className="w-50">
        <label htmlFor="fullName" className="block text-gray-700">
          Full Name:
        </label>
        <input
          value={fullName}
          onChange={changeFullName}
          type="text"
          id="fullName"
          name="fullName"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="w-50">
        <label htmlFor="age" className="block text-gray-700">
          Age:
        </label>
        <input
          value={age}
          onChange={changeAge}
          type="number"
          id="age"
          name="age"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="w-50">
        <label htmlFor="riskCategory" className="block text-gray-700">
          Risk Category:
        </label>
        {riskCategory
          ? (
            <select
              onChange={changeRiskCategory}
              id="riskCategory"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            >
              {risks.map((risk) =>
                risk.value === riskCategory
                  ? <option selected value={risk.value}>{risk.label}</option>
                  : <option value={risk.value}>{risk.label}</option>
              )}
            </select>
          )
          : (
            <select
              onChange={changeRiskCategory}
              id="riskCategory"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            >
              <option selected disabled>Choose risk</option>
              {risks.map((risk) => (
                <option value={risk.value}>{risk.label}</option>
              ))}
            </select>
          )}
      </div>

      <div className="w-50">
        <label htmlFor="organization" className="block text-gray-700">
          Organization:
        </label>
        {organizations &&
          (
            <>
              {organizationId
                ? (
                  <select
                    onChange={changeOrganizationName}
                    id="riskCategory"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                  >
                    {organizations.map((o) =>
                      o.id === organizationId
                        ? <option selected value={o.id}>{o.fullName}</option>
                        : <option value={o.id}>{o.fullName}</option>
                    )}
                  </select>
                )
                : (
                  <select
                    onChange={changeOrganizationId}
                    id="riskCategory"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                  >
                    <option selected disabled>Choose organization</option>
                    {organizations.map((o) => <option value={o.id}>{o.fullName}</option>)}
                  </select>
                )}
            </>
          )}
      </div>

      <div class="mt-5">
        <ButtonPrimary
          value={props.editInsuredEmployee ? "Update" : "Upload"}
          submit
        />
      </div>
    </form>
  );
};
