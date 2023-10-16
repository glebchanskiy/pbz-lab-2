import { useOrganizationsForm } from "src/hooks/useOrganizationsForm";
import type { Organization } from ".";
import ButtonPrimary from "components/commons/ButtonPrimary";

type FormProps = {
  cancelEdit: () => void;
  editOrganization?: Organization;
};

export const Form = (props: FormProps) => {
  console.log("render form");
  const {
    onSubmit,
    address,
    changeAddress,
    bankNumber,
    changeBankNumber,
    code,
    changeCode,
    fullName,
    changeFullName,
    shortName,
    changeShortName,
    specialization,
    changeSpecialization,
  } = useOrganizationsForm(props.cancelEdit, props.editOrganization);
  return (
    <form class="w-120 mt-8 flex flex-wrap gap-2" onSubmit={onSubmit}>
      <div class="w-50">
        <label for="address" class="block text-gray-700">Address:</label>
        <input
          value={address}
          onChange={changeAddress}
          type="text"
          id="address"
          name="address"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div class="w-50">
        <label for="bankNumber" class="block text-gray-700">Bank Number:</label>
        <input
          value={bankNumber}
          onChange={changeBankNumber}
          type="text"
          id="bankNumber"
          name="bankNumber"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div class="w-50">
        <label for="code" class="block text-gray-700">Code:</label>
        <input
          value={code}
          onChange={changeCode}
          type="text"
          id="code"
          name="code"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div class="w-50">
        <label for="fullName" class="block text-gray-700">Full Name:</label>
        <input
          value={fullName}
          onChange={changeFullName}
          type="text"
          id="fullName"
          name="fullName"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div class="w-50">
        <label for="shortName" class="block text-gray-700">Short Name:</label>
        <input
          value={shortName}
          onChange={changeShortName}
          type="text"
          id="shortName"
          name="shortName"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div class="w-50">
        <label for="specialization" class="block text-gray-700">
          Specialization:
        </label>
        <input
          value={specialization}
          onChange={changeSpecialization}
          type="text"
          id="specialization"
          name="specialization"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div class="mt-5">
        <ButtonPrimary
          value={props.editOrganization ? "Update" : "Upload"}
          submit
        />
      </div>
    </form>
  );
};
