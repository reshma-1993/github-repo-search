import { timeSince } from '../time';

describe('timeSince', () => {
  it('should return "24 hours ago" if given date is one day before current date', () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    expect(timeSince(yesterday)).toBe('24 hours ago');
  });

  it('should return "12 months ago" if given date is one year before current date', () => {
    const now = new Date();
    const lastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    expect(timeSince(lastYear)).toBe('12 months ago');
  });

  it('should return "2 months ago" if given date is two months before current date', () => {
    const now = new Date();
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    expect(timeSince(twoMonthsAgo)).toBe('2 months ago');
  });

  it('should return "5 minutes ago" if given date is five minutes before current date', () => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    expect(timeSince(fiveMinutesAgo)).toBe('5 minutes ago');
  });
});
