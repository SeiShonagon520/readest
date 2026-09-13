import { describe, expect, test } from 'vitest';

import { TTS_CACHE_REQUIRES_PREMIUM, isTTSCacheAllowed, isTTSCacheInPlan } from '@/utils/access';

describe('isTTSCacheInPlan', () => {
  test('every plan can use the offline TTS audio cache', () => {
    expect(isTTSCacheInPlan('plus', false)).toBe(true);
    expect(isTTSCacheInPlan('pro', false)).toBe(true);
    expect(isTTSCacheInPlan('purchase', false)).toBe(true);
    expect(isTTSCacheInPlan('free', false)).toBe(true);
  });
});

describe('isTTSCacheAllowed (premium paywall)', () => {
  test('downloading TTS audio for offline playback is available to every plan when the paywall is disabled', () => {
    expect(TTS_CACHE_REQUIRES_PREMIUM).toBe(false);
    expect(isTTSCacheAllowed('free', false)).toBe(true);
    expect(isTTSCacheAllowed('plus', false)).toBe(true);
    expect(isTTSCacheAllowed('pro', false)).toBe(true);
    expect(isTTSCacheAllowed('purchase', false)).toBe(true);
  });
});

describe('isTTSCacheAllowed — customization unlock', () => {
  test('entitles a free user who bought Full Customization', () => {
    expect(isTTSCacheAllowed('free', true)).toBe(true);
  });

  test('entitles a grandfathered storage buyer, who carries the flag', () => {
    expect(isTTSCacheAllowed('purchase', true)).toBe(true);
  });

  test('entitles a storage-only buyer as well', () => {
    expect(isTTSCacheAllowed('purchase', false)).toBe(true);
  });
});
