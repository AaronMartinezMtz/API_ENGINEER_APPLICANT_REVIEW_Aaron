export function getCDMXDate(): Date {
  const now = new Date();

  const cdmxTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' })
  );

  return cdmxTime;
}
