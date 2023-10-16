import { View } from "./View";
import { Form } from "./Form";
import { useState } from "preact/hooks";

export type Organization = {
  id?: number;
  address: string;
  bankNumber: string;
  code: string;
  fullName: string;
  shortName: string;
  specialization: string;
};

const Organizations = () => {

  const [organization, setOrganization] = useState<Organization|undefined>()

  return (
    <div class={"w-10/11 container flex flex-col mx-auto gap-4"}>
      <h1 class="text-[36px]">Organizations</h1>
      <View setEditOrganization={setOrganization}/>
      <Form editOrganization={organization} cancelEdit={() => setOrganization(undefined)} />
    </div>
  );
};

export default Organizations;
