# tresor-ecosystem
Run the TRESOR ecosystem as docker containers

# Overview

## Components

## Authentication and Authorization

The TRESOR Ecosystem uses [Claims-based Identities](http://en.wikipedia.org/wiki/Claims-based_identity) for consistent and secure federated authentication. The current implementation follows the [Guide to Claims-Based Identity and Access Control](https://msdn.microsoft.com/en-us/library/ff423674.aspx) and uses Microsoft Active Directory Federation Services. It is comparable to the [Federated Identity with Multiple Partners](https://msdn.microsoft.com/en-us/library/hh446524.aspx) scenario.

For authorization, the TRESOR Ecosystem uses the [TRESOR XACML Policy Decision Point](https://github.com/TU-Berlin-SNET/tresor-pdp), which is based on the [WSO2 Balana Engine](https://github.com/wso2/balana).

### Authentication and Authorization flow

This chapter details the authentication and authorization flow in the TRESOR ecosystem.

#### TRESOR Service access

At first, the service consumer uses their browser to access a TRESOR service by entering a service URL, whose hostname maps to the IP address of the proxy. In the testbed, these hostnames match *.service.cloud-tresor.com.

#### Proxy redirection to Federation Provider

The proxy receives the service request and redirects the unauthenticated user to the Federation Provider. This redirection can be seen in the [RedirectToSSOFrontendHandler](https://github.com/TU-Berlin-SNET/tresor-proxy/blob/master/lib/tresor/frontend/claim_sso/redirect_to_sso_frontend_handler.rb) class in the TRESOR Proxy source.

#### Federation Provider redirect to Identity Provider

Based on a special "home realm URL" sent by the proxy, the Federation Provider redirects the user to one of the supported authentication providers: a mock Identity Provider (used in the demonstrator), [SkIDentity](https://www.skidentity.com/en/home) (secure Smart Card authentication), or a regular Active Directory.

#### Authentication with the Identity Provider

The user authenticates themselves with the respective Identity Provider using username/password, a smartcard, or any other supported authentication method. After authentication, the Identity Provider issues a SAML token and redirects the user back to the Federation Provider.

#### Federation Provider mapping of Identity Provider SAML tokens

Through the Identity Provider redirection, the Federation Provider gets the SAML token. As different Identity Providers provide different tokens and attributes, the Federation Provider maps them to a consistent set of SAML attributes and issues a new SAML token. After issuing this SAML token, the user is redirected back to the proxy.

#### Authorization of a service request by the proxy PEP

After the user was authenticated, the XACML Policy Enforcement Point (PEP) contained in the proxy requests an XACML authorization decision from the Policy Decision Point (PDP). The XACMLv3 authorization request template can be found [in the proxy sources](https://github.com/TU-Berlin-SNET/tresor-proxy/blob/master/lib/tresor/frontend/xacml/xacml_request.erb).

The following information are contained in the authorization request:
* Category: Access Subject
  * Subject ID (taken from the SAML token)
  * Organization UUID (queried from the TRESOR broker using the organization name from the SAML token)
  * Subject Attributes (e.g. user groups, taken from the SAML token)
* Category: Resource
  * Service UUID (queried from the TRESOR broker using the first part of the hostname, e.g., "tresordemo" from "tresordemo.service.cloud-tresor.com")
  * Resource ID (the request path, e.g., "/patients/8172391" or "/admin")
* Category: Action
  * Action ID (the HTTP method, e.g. "GET" or "DELETE")

The Policy Decision Point uses all of these information to retrieve the respective service access rule for the specified organization and to decide, if the request is to be allowed or denied.

#### Proxying of the authenticated and authorized request/response

After successful authentication and permitted authorization, the request/response is proxied to the upstream server, including information about the authenticated user. See [here](https://github.com/TU-Berlin-SNET/tresor-proxy#request-headers) for all relayed information.

### Further reading

There are some scientific publications about the TRESOR authentication and authorization system:

* Thatmann, D (2014). [Distributed Authorization in Complex Multi Entity-Driven API Ecosystems](http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=7021072&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D7021072). Proceedings of the 8th Intl. Conference on Signal Processing and Communication Systems (ICSPCS 2014). IEEE.
* Raschke, P. and Zickau, S. (2014). [A Template-Based Policy Generation Interface for RESTful Web Services](http://link.springer.com/chapter/10.1007%2F978-3-662-45550-0_17). On the Move to Meaningful Internet Systems: OTM 2014 Workshops. Springer Berlin Heidelberg, 137-153.
* Zickau, S. and Thatmann, D. and Ermakova, T. and Repschläger, J. and Zarnekow, R. and Küpper, A. (2014). [Enabling Location-based Policies in a Healthcare Cloud Computing Environment](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=6969017&punumber%3D6961333%26sortType%3Dasc_p_Sequence%26filter%3DAND%28p_IS_Number%3A6968953%29%26pageNumber%3D3). Proceedings of the 3rd IEEE International Conference on Cloud Networking (IEEE CloudNet). IEEE.

# Setup test services in the TRESOR broker
`docker exec -i -t tresorecosystem_broker_1 /bin/bash -c "source /usr/local/rvm/scripts/rvm && RAILS_ENV=production rake tresor:setup_environment"`
