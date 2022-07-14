<p>
    <img alt="Rolls-Royce Logo" width="100" src="https://raw.githubusercontent.com/rropen/.github/main/img/logo.png">
    <br>
    Repo Template to be used throughout the Rolls-Royce GitHub Enterprise Instances
</p>

<!-- Place any useful shield.io shields here.  Use the style=flat styling option. -->
<p>
 <a href=""><img src="https://img.shields.io/badge/Rolls--Royce-Software%20Factory-10069f"></a>
 <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen?style=flat"></a>
</p>

---

<<<<<<< HEAD
<p>
    <img alt="Rolls-Royce Logo" width="100" src="https://raw.githubusercontent.com/rropen/.github/main/img/logo.png">
    <br>
    Repo Template to be used throughout the Rolls-Royce GitHub Enterprise Instances
</p>

<!-- Place any useful shield.io shields here.  Use the style=flat styling option. -->
<p>
 <a href=""><img src="https://img.shields.io/badge/Rolls--Royce-Software%20Factory-10069f"></a>
 <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen?style=flat"></a>
</p>

---

=======
>>>>>>> 20d02cf422e3174f6a67f945b02bfa65a80c2735
## Overview

This project is intended to provide a way for the Rolls-Royce Software Factory to track and display it's [DORA](https://www.devops-research.com/research.html) metrics in accordance with modern DevSecOps [best practices](https://itrevolution.com/measure-software-delivery-performance-four-key-metrics/). As we continue in our Digital Transformation and align ourselves with the DoD's [efforts](https://software.af.mil/wp-content/uploads/2021/05/Digital-Building-Code-and-Scorecard-Memo-v15.pdf) around DevSecOps we need to track these metrics. Initially we'll start with the [four key](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance) metrics and likely scale out from there as appropriate.

We're also investigating the use of the [Flow Framework](https://projecttoproduct.org/) and how we might use it to better align our value stream to usable metrics.

Initial plans for this project are to use our standard "Modern" architecture:

## Usage

TBD

## Visibility

This project is meant to be in the open source - public facing region of the Rolls-Royce GitHub Enterprise instance. Any secrets or secure configuration information will be handled through the use of secure secrets and other cloud native ways. If any features or updates need to be added to this project that would push it out of the public facing organization, then it will be moved. Contact [Josh Haines](mailto:Josh.Haines@Rolls-Royce.com) if you have any questions..

## DORA Metric Calculations

**Deployment Frequency:** How often we as an organization successfully releases to production

- Elite: Multiple deploys per day
- High: Between once per day and once per week
- Medium: Between once per week and once per month
- Low: Between once per month and once every six months

**Lead Time for Changes:** The amount of time it takes a commit to get into production

- Elite: Less than one day
- High: Between one day and one week
- Medium: Between one week and one month
- Low: Between one month and six months

**Time to Restore Service:** How long it takes an organization to recover from a failure in production

- Elite: Less than one hour
- High: Less than one day
- Medium: Less than one day
- Low: Between one week and one month

**Change failure rate:** The percentage of deployments causing a failure in production

- Elite: 0-15%
- High: 0-15%
- Medium: 0-15%
- Low: 46-60%
