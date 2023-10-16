import { supabase } from "db/supabase/supabase";
import { useEffect, useState } from "preact/hooks";
import type { Organization } from ".";
import Row from "components/commons/Row";
import Item from "components/commons/Item";
import ButtonItem from "components/commons/ButtonItem";
import ButtonPrimary from "components/commons/ButtonPrimary";
import Table from "components/commons/Table";

type ViewProps = {
  setEditOrganization: (o: Organization) => void;
};

export const View = (props: ViewProps) => {
  const [orgs, setOrgs] = useState<Organization[] | undefined>(undefined);

  useEffect(() => {
    updateState();
  }, []);

  const updateState = async () => {
    const { data } = await supabase.from("Organization").select('*');
    if (data) {
      setOrgs(data);
    }
  };

  return (
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <Table>
          <OrganizationsHeader />
          <>
            {orgs &&
              orgs.map((o) => (
                <OrganizationCard
                  organization={o}
                  onEditClick={async () => {
                    props.setEditOrganization(o);
                  }}
                  onRemoveClick={async () => {
                    await supabase.from("Organization").delete().eq(
                      "id",
                      o.id!,
                    );
                    await updateState();
                  }}
                />
              ))}
          </>
        </Table>
      </div>
      <div class="flex justify-start">
        <ButtonPrimary value="Reload" onClick={updateState} />
      </div>
    </div>
  );
};

type OrganizationCardProps = {
  organization: Organization;
  onEditClick: () => void;
  onRemoveClick: () => void;
};

const OrganizationCard = (props: OrganizationCardProps) => (
  <Row>
    <Item content={props.organization.id!} center />
    <Item content={props.organization.address} />
    <Item content={props.organization.bankNumber} center monospace />
    <Item content={props.organization.code} center monospace />
    <Item content={props.organization.fullName} />
    <Item content={props.organization.shortName} />
    <Item content={props.organization.specialization} />

    <ButtonItem content="Edit" onClick={props.onEditClick} />
    <ButtonItem content="Remove" onClick={props.onRemoveClick} />
  </Row>
);

const OrganizationsHeader = () => (
  <Row>
    <Item content="ID" center />
    <Item content="Address" center />
    <Item content="Bank number" center />
    <Item content="Code" center />
    <Item content="Full name" center />
    <Item content="Short name" center />
    <Item content="Specialization" center />
  </Row>
);
