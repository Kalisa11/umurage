import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Terms of Service
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These terms govern your use of the Umurage platform. By using our
              services, you agree to these terms and our commitment to
              preserving Rwandan cultural heritage.
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
                Welcome to Umurage, a digital platform dedicated to preserving,
                promoting, and celebrating Rwandan indigenous culture through
                interactive storytelling, multimedia content, and community
                engagement. These Terms of Service ("Terms") govern your access
                to and use of the Umurage platform, including all content,
                features, and services available through our website and
                applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using our platform, you agree to be bound by
                these Terms. If you disagree with any part of these terms, you
                may not access our platform.
              </p>
            </section>

            {/* Definitions */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                2. Definitions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    2.1 Key Terms
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>"Platform"</strong> refers to the Umurage website,
                      applications, and all associated services
                    </li>
                    <li>
                      <strong>"User"</strong> refers to any individual who
                      accesses or uses our platform
                    </li>
                    <li>
                      <strong>"Contributor"</strong> refers to users who submit
                      cultural content to our platform
                    </li>
                    <li>
                      <strong>"Content"</strong> refers to all cultural
                      materials, including stories, music, artwork, and
                      documentation
                    </li>
                    <li>
                      <strong>"Services"</strong> refers to all features and
                      functionality provided by Umurage
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Acceptance of Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                3. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the Umurage platform, you confirm that you
                have read, understood, and agree to be bound by these Terms of
                Service. These terms apply to all users of the platform,
                including visitors, registered users, and contributors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you are using our platform on behalf of an organization, you
                represent that you have the authority to bind that organization
                to these terms.
              </p>
            </section>

            {/* User Accounts */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                4. User Accounts and Registration
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    4.1 Account Creation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To access certain features of our platform, you may need to
                    create an account. When creating an account, you must:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Provide accurate, current, and complete information</li>
                    <li>
                      Maintain and update your account information as necessary
                    </li>
                    <li>
                      Protect your account credentials and not share them with
                      others
                    </li>
                    <li>
                      Notify us immediately of any unauthorized use of your
                      account
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    4.2 Account Responsibilities
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You are responsible for all activities that occur under your
                    account. You agree not to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Use another person's account without permission</li>
                    <li>Create multiple accounts for malicious purposes</li>
                    <li>Use automated systems to access our platform</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                5. Acceptable Use Policy
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    5.1 Permitted Uses
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You may use our platform for:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      Accessing and learning about Rwandan cultural heritage
                    </li>
                    <li>Contributing authentic cultural content and stories</li>
                    <li>Participating in community discussions and events</li>
                    <li>Educational and research purposes</li>
                    <li>Personal cultural enrichment and exploration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    5.2 Prohibited Uses
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree not to use our platform to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Submit false, misleading, or fraudulent information</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Spread hate speech or discriminatory content</li>
                    <li>
                      Upload malicious software or attempt to compromise
                      security
                    </li>
                    <li>
                      Use our platform for commercial purposes without
                      permission
                    </li>
                    <li>Attempt to reverse engineer or copy our platform</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Submission */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                6. Content Submission and Ownership
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    6.1 Content Guidelines
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When submitting content to our platform, you must ensure
                    that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Content is authentic and culturally accurate</li>
                    <li>You have the right to share the content</li>
                    <li>
                      Content respects cultural sensitivities and traditions
                    </li>
                    <li>Content is appropriate for all audiences</li>
                    <li>
                      You provide proper attribution for any third-party content
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    6.2 Content License
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By submitting content to our platform, you grant Umurage a
                    non-exclusive, worldwide, royalty-free license to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      Display, reproduce, and distribute your content on our
                      platform
                    </li>
                    <li>
                      Use your content for cultural preservation and educational
                      purposes
                    </li>
                    <li>
                      Archive and maintain your content as part of our digital
                      heritage collection
                    </li>
                    <li>Promote and showcase your content to other users</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    You retain ownership of your original content and may
                    continue to use it elsewhere.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    6.3 Content Moderation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to review, moderate, and remove content
                    that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Violates these terms or our community guidelines</li>
                    <li>Is inappropriate, offensive, or harmful</li>
                    <li>Contains false or misleading information</li>
                    <li>Infringes on intellectual property rights</li>
                    <li>Is not culturally appropriate or accurate</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                7. Intellectual Property Rights
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    7.1 Platform Ownership
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The Umurage platform, including its design, functionality,
                    and original content, is owned by Umurage and protected by
                    intellectual property laws. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Platform design and user interface</li>
                    <li>Software code and technical implementation</li>
                    <li>Branding, logos, and trademarks</li>
                    <li>Original platform content and features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    7.2 User Content Rights
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Users retain ownership of their submitted content. However,
                    by using our platform, you acknowledge that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      Other users may view and interact with your public content
                    </li>
                    <li>
                      We may use your content for cultural preservation purposes
                    </li>
                    <li>
                      Your content may be archived as part of our heritage
                      collection
                    </li>
                    <li>
                      You are responsible for ensuring you have rights to share
                      your content
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy and Data */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                8. Privacy and Data Protection
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Our collection, use, and
                protection of your personal information is governed by our
                Privacy Policy, which is incorporated into these Terms by
                reference. By using our platform, you consent to our data
                practices as described in our Privacy Policy.
              </p>
            </section>

            {/* Cultural Sensitivity */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                9. Cultural Sensitivity and Respect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Umurage is committed to preserving and respecting Rwandan
                cultural heritage. Users must:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Respect cultural traditions and sensitivities</li>
                <li>Ensure cultural content is accurate and authentic</li>
                <li>
                  Avoid misrepresentation or appropriation of cultural elements
                </li>
                <li>
                  Engage with content in a respectful and educational manner
                </li>
                <li>
                  Support the preservation of indigenous knowledge and
                  traditions
                </li>
              </ul>
            </section>

            {/* Disclaimers */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                10. Disclaimers and Limitations
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    10.1 Service Availability
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We strive to provide reliable service but cannot guarantee
                    uninterrupted access to our platform. We may temporarily
                    suspend or modify our services for maintenance, updates, or
                    other operational reasons.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    10.2 Content Accuracy
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    While we encourage authentic and accurate cultural content,
                    we cannot guarantee the accuracy, completeness, or cultural
                    authenticity of all user-submitted content. Users should
                    exercise their own judgment when engaging with platform
                    content.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    10.3 Limitation of Liability
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To the maximum extent permitted by law, Umurage shall not be
                    liable for any indirect, incidental, special, consequential,
                    or punitive damages arising from your use of our platform.
                  </p>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                11. Account Termination
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    11.1 Termination by User
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You may terminate your account at any time by contacting us
                    or using the account deletion feature. Upon termination,
                    your account will be deactivated, but cultural content you
                    have contributed may be retained for preservation purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    11.2 Termination by Umurage
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account if you:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Violate these Terms of Service</li>
                    <li>Engage in fraudulent or harmful activities</li>
                    <li>Submit inappropriate or offensive content</li>
                    <li>Attempt to compromise platform security</li>
                    <li>Fail to comply with our community guidelines</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                12. Governing Law and Dispute Resolution
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of Rwanda. Any disputes arising from these terms
                or your use of our platform shall be resolved through good faith
                negotiation, and if necessary, through appropriate legal
                channels in Rwanda.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                13. Changes to Terms of Service
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms of Service from time to time to
                reflect changes in our services, legal requirements, or platform
                policies. We will notify users of material changes by posting
                the updated terms on our platform and updating the "Last
                updated" date.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Your continued use of our platform after any changes constitutes
                acceptance of the updated terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                14. Contact Information
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service or need
                  assistance, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> legal@umurage.com
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
              These Terms of Service are effective as of{" "}
              {new Date().toLocaleDateString()} and apply to all users of the
              Umurage platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
