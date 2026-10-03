export const bn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

export const taka = (n: number) =>
  `৳${new Intl.NumberFormat("bn-BD").format(n)}`;