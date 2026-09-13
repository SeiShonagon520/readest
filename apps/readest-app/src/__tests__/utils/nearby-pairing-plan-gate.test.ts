import { describe, expect, test } from 'vitest';

import {
  NEARBY_PAIRING_REQUIRES_PREMIUM,
  isNearbyPairingAllowed,
  isNearbyPairingInPlan,
} from '@/utils/access';

describe('isNearbyPairingInPlan', () => {
  test('every plan can pair Nearby BookDrop devices', () => {
    expect(isNearbyPairingInPlan('plus', false)).toBe(true);
    expect(isNearbyPairingInPlan('pro', false)).toBe(true);
    expect(isNearbyPairingInPlan('purchase', false)).toBe(true);
    expect(isNearbyPairingInPlan('free', false)).toBe(true);
  });
});

describe('isNearbyPairingAllowed (premium paywall)', () => {
  test('pairing for confirmation-free drops is available to every plan when the paywall is disabled', () => {
    expect(NEARBY_PAIRING_REQUIRES_PREMIUM).toBe(false);
    expect(isNearbyPairingAllowed('free', false)).toBe(true);
    expect(isNearbyPairingAllowed('plus', false)).toBe(true);
    expect(isNearbyPairingAllowed('pro', false)).toBe(true);
    expect(isNearbyPairingAllowed('purchase', false)).toBe(true);
  });

  test('the Full Customization unlock entitles a free user', () => {
    expect(isNearbyPairingAllowed('free', true)).toBe(true);
    expect(isNearbyPairingAllowed('purchase', true)).toBe(true);
  });
});
