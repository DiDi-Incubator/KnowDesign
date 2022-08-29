/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
export enum LICENSE_TYPE {
  basic = 10,
  standard = 20,
  gold = 30,
  platinum = 40,
  enterprise = 50,
  trial = 60,
}

/** @public */
export type LicenseType = keyof typeof LICENSE_TYPE;

const basicLicense: LicenseType = 'basic';

/** @internal */
export const PLUGIN = Object.freeze({
  id: 'searchprofiler',
  minimumLicenseType: basicLicense,
});
