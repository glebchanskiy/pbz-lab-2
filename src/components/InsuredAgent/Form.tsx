import { useInsuranceAgentForm } from "src/hooks/useInsuranceAgentForm";
import type { InsuranceAgent } from "@prisma/client";
import ButtonPrimary from "components/commons/ButtonPrimary";

type FormProps = {
  cancelEdit: () => void;
  editInsuranceAgent?: InsuranceAgent;
};

export const Form = (props: FormProps) => {
  const {
    onSubmit,
    fullName,
    changeFullName,
    passportData,
    changePassportData,
  } = useInsuranceAgentForm(props.cancelEdit, props.editInsuranceAgent);

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
        <label htmlFor="passportData" className="block text-gray-700">
          Passport Data:
        </label>
        <input
          value={passportData}
          onChange={changePassportData}
          type="text"
          id="passportData"
          name="passportData"
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div class="mt-5">
        <ButtonPrimary
          value={props.editInsuranceAgent ? "Update" : "Upload"}
          submit
        />
      </div>
    </form>
  );
};
