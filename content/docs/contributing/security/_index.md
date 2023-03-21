---
linktitle: To Security
title: "Contributing to O3DE: Security"
description: Learn about how you can keep Open 3D Engine (O3DE) secure.
toc: true
weight: 300
---

## Open 3D Engine: Security
This page describes the Security and Disclosure policies for **Open 3D Engine (O3DE)**.

O3DE values all contributions that help keep O3DE secure. [SIG-Security](https://github.com/o3de/sig-security) volunteers will thoroughly research and investigate all reported vulnerabilities. 

# How to report a vulnerability
We encourage all vulnerabilities to be reported through the [security@o3de.org](mailto:security@o3de.org) mailing list. Vulnerability reports should follow the same information reporting format as [standard O3DE issues](https://github.com/o3de/o3de/blob/development/.github/ISSUE_TEMPLATE/bug_template.md) along with any security specific details.

## When should I report a vulnerability?
* You have discovered a potential security issue relating to O3DE. 
* You have discovered or are aware of a security issue relating to an O3DE dependency that may impact O3DE.
     * If the issues is in a product that O3DE depends upon, we strongly encourage you to also engage with that project's vulnerability reporting mechanisms. 

# When should I NOT report a vulnerability?
* You need help setting up or have issues relating to the use of security dependencies such as OpenSSL or TLS/DTLS.
* You need help applying a security related fix to your O3DE applications. 
* The issue is not related to security. Please report issue using the normal [O3DE issue reporting process](https://github.com/o3de/o3de/issues).

## Can I report a vulnerability via GitHub Issues?
If there is publicly disclosed security information, such as a report in the [National Vulnerability Database](https://nvd.nist.gov/) then GitHub issues can be used to communicate security vulnerabilities impacting O3DE.

# Security vulnerability response
When a security vulnerability is reported via the [security mailing list](mailto:security@o3de.org), a member of the SIG-Security response team should respond within 3 working days. Once the issue has been acknowledged, the SIG-Security response team will follow its [documented response process](https://github.com/o3de/sig-security/issues/14) to ensure the reporter is updated and informed of current actions and next steps.

Any vulnerability information will be treated as confidential and will be not shared outside the security response process. Vulnerability information will not be publicly shared or disclosed without the consent of the reporter.

# Public disclosure policy
The public disclosure date of any security vulnerability will be negotiated between SIG-Security and the vulnerability reporter. The SIG aims to publicly disclose the issue as soon as possible, ideally once a mitigation has been identified. Disclosure time can range from almost immediately, for publicly known issues, to a few weeks depending on the complexity of issue and coordination required.
