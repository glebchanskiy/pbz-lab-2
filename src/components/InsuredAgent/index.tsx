import { InsuranceAgent, View } from "./View";
import { Form } from "./Form";
import { useState } from "preact/hooks";

const InsuranceAgents = () => {
  const [insuranceAgent, setInsuranceAgent] = useState<InsuranceAgent>();

  return (
    <div className="w-10/11 container flex flex-col mx-auto gap-4">
      <h1 className="text-[36px]">Insurance Agents</h1>
      <View setEditInsuranceAgent={setInsuranceAgent} />
      <Form editInsuranceAgent={insuranceAgent} cancelEdit={() => setInsuranceAgent(undefined)} />
    </div>
  );
};

export default InsuranceAgents;