function toShortAddress(address?: `0x${string}`) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default toShortAddress;
