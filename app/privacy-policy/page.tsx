import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-2">
            Privacy Policy
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Last Updated On 27-Jul-2025 • Effective Date 4-Apr-2025
          </p>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This Privacy Policy describes the policies of RajScape Inc., 235 W
            Van Buren Street, Illinois 60607, United States of America, email:
            support@rajscape.com, phone: 2245588478, regarding the collection,
            use and disclosure of your information that we collect when you use
            our website (https://rajscape.com) (the “Service”).
          </p>
          <p className="mb-4">
            By accessing or using the Service, you are consenting to the
            collection, use and disclosure of your information in accordance
            with this Privacy Policy. If you do not consent to the same, please
            do not access or use the Service.
          </p>
          <p className="mb-4">
            We may modify this Privacy Policy at any time without any prior
            notice to you and will post the revised Privacy Policy on the
            Service. The revised Policy will be effective 180 days from when the
            revised Policy is posted in the Service and your continued access or
            use of the Service after such time will constitute your acceptance
            of the revised Privacy Policy. We therefore recommend that you
            periodically review this page.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Creating user account</li>
            <li>Administration info</li>
          </ul>
          <p className="mb-4">
            If we want to use your information for any other purpose, we will
            ask you for consent and will use your information only on receiving
            your consent and then only for the specified purpose, unless
            required by law.
          </p>

          <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
          <p className="mb-4">
            Depending on the applicable law, you may have the right to access
            and rectify or erase your personal data, restrict or object to
            processing, request portability of your personal information,
            withdraw consent, or lodge a complaint with a statutory authority.
            To exercise these rights, please write to us at
            support@rajscape.com. Note that if you do not allow us to collect or
            process the required personal information or withdraw your consent,
            you may not be able to access or use the services for which your
            information was requested.
          </p>

          <h2 className="text-xl font-semibold mb-2">Cookies Etc.</h2>
          <p className="mb-4">
            To learn more about how we use cookies and your choices in relation
            to these tracking technologies, please refer to our Cookie Policy.
          </p>

          <h2 className="text-xl font-semibold mb-2">Security</h2>
          <p className="mb-4">
            The security of your information is important to us and we will use
            reasonable security measures to prevent its loss, misuse, or
            unauthorized alteration. However, due to the inherent risks, we
            cannot guarantee absolute security of any information transmitted to
            us, and you do so at your own risk.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Grievance / Data Protection Officer
          </h2>
          <p className="mb-4">
            If you have any queries or concerns about how we process your
            information, please contact our Grievance Officer at
            support@rajscape.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
