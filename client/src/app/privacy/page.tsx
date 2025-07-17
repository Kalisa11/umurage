import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This privacy policy explains how
              Umurage collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Umurage is a digital platform dedicated to preserving,
                promoting, and celebrating Rwandan indigenous culture through
                interactive storytelling, multimedia content, and community
                engagement. We are committed to protecting your privacy and
                ensuring the security of your personal information.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                2. Information We Collect
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    2.1 Personal Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you create an account or interact with our platform, we
                    may collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Name and contact information</li>
                    <li>Email address</li>
                    <li>Profile information and bio (for contributors)</li>
                    <li>Authentication credentials</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    2.2 Content and Submissions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you contribute content to our platform, we collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      Cultural content submissions (stories, music, artwork)
                    </li>
                    <li>Audio recordings and multimedia files</li>
                    <li>Historical records and documentation</li>
                    <li>Comments and community interactions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    2.3 Usage Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We automatically collect information about how you use our
                    platform:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Pages visited and content accessed</li>
                    <li>Search queries and browsing patterns</li>
                    <li>Audio playback preferences and history</li>
                    <li>Device information and browser type</li>
                    <li>IP address and location data (for map features)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                3. How We Use Your Information
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    3.1 Platform Operations
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Provide access to cultural content and features</li>
                    <li>Manage user accounts and authentication</li>
                    <li>Process content submissions and moderation</li>
                    <li>
                      Display contributor profiles and content attribution
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    3.2 Cultural Preservation
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Preserve and archive Rwandan cultural heritage</li>
                    <li>Facilitate community engagement and education</li>
                    <li>Support cultural events and activities promotion</li>
                    <li>Enable interactive map features for heritage sites</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    3.3 Platform Improvement
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Analyze usage patterns to improve user experience</li>
                    <li>Develop new features and content recommendations</li>
                    <li>Ensure platform security and prevent abuse</li>
                    <li>Provide customer support and assistance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                4. Information Sharing and Disclosure
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    4.1 Public Content
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Content you submit to our platform may be made publicly
                    available to preserve and share Rwandan cultural heritage.
                    This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Cultural stories, music, and artwork</li>
                    <li>Contributor names and profile information</li>
                    <li>Historical records and documentation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    4.2 Third-Party Services
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may share information with trusted third-party service
                    providers who help us operate our platform, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Database and hosting services (Supabase, Vercel)</li>
                    <li>Analytics and performance monitoring</li>
                    <li>Content delivery and media storage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    4.3 Legal Requirements
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may disclose your information if required by law, legal
                    process, or to protect the rights, property, or safety of
                    Umurage, our users, or others.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                5. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication systems</li>
                <li>Secure database management practices</li>
              </ul>
            </section>

            {/* User Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                6. Your Rights and Choices
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    6.1 Access and Control
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    6.2 Content Management
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For content you have contributed:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>You may request removal of your submitted content</li>
                    <li>You can update your contributor profile information</li>
                    <li>You maintain rights to your original creative works</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your
                experience on our platform. These help us:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Remember your preferences and settings</li>
                <li>Maintain your session and authentication</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content recommendations</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You can manage cookie preferences through your browser settings.
              </p>
            </section>

            {/* Data Retention */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                8. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to
                provide our services and fulfill our cultural preservation
                mission. Cultural content may be retained indefinitely to
                maintain our digital heritage archive. Personal account
                information is retained until you request deletion or close your
                account.
              </p>
            </section>

            {/* International Transfers */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                9. International Data Transfers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your country of residence. We ensure
                appropriate safeguards are in place to protect your data in
                accordance with applicable privacy laws.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                10. Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is designed for general audiences and we do not
                knowingly collect personal information from children under 13.
                If we become aware that we have collected personal information
                from a child under 13, we will take steps to delete such
                information.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of any material changes by posting the updated policy on our
                platform and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                12. Contact Us
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this privacy policy or our
                  data practices, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> privacy@umurage.com
                  </p>
                  <p>
                    <strong>Address:</strong> Kigali, Rwanda
                  </p>
                  <p>
                    <strong>Phone:</strong> Not available
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  We will respond to your inquiry within 30 days.
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              This privacy policy is effective as of{" "}
              {new Date().toLocaleDateString()} and applies to all users of the
              Umurage platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
