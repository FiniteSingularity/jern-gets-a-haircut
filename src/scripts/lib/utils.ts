export function secondsToElapsedTime(time: number): string {
   const secondsElapsed = Math.floor(time / 10);
   const minutes = Math.floor(secondsElapsed / 6000);
   const remaining = secondsElapsed % 6000;
   const seconds = Math.floor(remaining / 100);
   const hundredths = remaining % 100;
   return`${minutes}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
}
