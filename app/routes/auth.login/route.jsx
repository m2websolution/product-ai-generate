import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useState } from "react";
import { Form } from "react-router";
import { login } from "../../shopify.server";

export const loader = async () => {
  return null;
};

export const action = async ({ request }) => {
  return login(request);
};

export default function Auth() {
  const [shop, setShop] = useState("");

  return (
    <AppProvider embedded={false}>
      <s-page>
        <Form method="post">
          <s-section heading="Log in">
            <s-text-field
              name="shop"
              label="Shop domain"
              details="example.myshopify.com"
              value={shop}
              onChange={(e) => setShop(e.currentTarget.value)}
              autocomplete="on"
            ></s-text-field>
            <s-button type="submit">Log in</s-button>
          </s-section>
        </Form>
      </s-page>
    </AppProvider>
  );
}
