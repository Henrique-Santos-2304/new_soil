const notEmptyMessage = (item: string) => `Campo ${item} não pode estar vazio`;
const notStringMessage = (item: string) => `Campo ${item} tem que ser String`;
const notNumberMessage = (item: string) => `Campo ${item} tem que ser Number`;
const notBooleanMessage = (item: string) => `Campo ${item} tem que ser Boolean`;

export {
  notEmptyMessage,
  notStringMessage,
  notNumberMessage,
  notBooleanMessage,
};
