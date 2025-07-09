// Create this new file to fix image import types
declare module "*.webp" {
  const value: string;
  export default value;
}