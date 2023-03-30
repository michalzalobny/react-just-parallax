declare module "prefix" {
  export default function prefix(action: string): string;
  export default function prefix(action: "transform"): "transform";
}
