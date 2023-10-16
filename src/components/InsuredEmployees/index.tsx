import { InsuredEmploye, View } from "./View";
import { Form } from "./Form";
import { useState } from "preact/hooks";



const InsuredEmployees = () => {

  const [insuredEmployee, setInsuredEmployee] = useState<InsuredEmploye|undefined>()

  return (
    <div class={"w-10/11 container flex flex-col mx-auto gap-4"}>
      <h1 class="text-[36px]">Insured Employees</h1>
      <View setEditInsuredEmployee={setInsuredEmployee}/>
      <Form editInsuredEmployee={insuredEmployee} cancelEdit={() => setInsuredEmployee(undefined)} />
    </div>
  );
};

export default InsuredEmployees;
