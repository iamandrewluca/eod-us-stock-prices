import * as React from "react";
import { Container } from 'reactstrap'

export const Body = ({ companyData }: any) => {
  return (
    <Container>
      <pre>{JSON.stringify(companyData, null, 2)}</pre>
    </Container>
  )
};
