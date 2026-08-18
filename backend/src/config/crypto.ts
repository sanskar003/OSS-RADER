import dotenv from "dotenv";
dotenv.config();


import sodium from "libsodium-wrappers";

const keyHex = process.env.ENCRYPTION_KEY;

if (!keyHex) {
  throw new Error("❌ ENCRYPTION_KEY is missing. Add it to your .env file.");
}

const key = Buffer.from(keyHex, "hex");

if (key.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be exactly 32 bytes");
}

export async function encryptToken(token: string) {
  await sodium.ready;

  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const cipher = sodium.crypto_secretbox_easy(token, nonce, key);

  return {
    cipher: Buffer.from(cipher).toString("hex"),
    nonce: Buffer.from(nonce).toString("hex"),
  };
}

export async function decryptToken(cipherHex: string, nonceHex: string) {
  await sodium.ready;

  const cipher = Buffer.from(cipherHex, "hex");
  const nonce = Buffer.from(nonceHex, "hex"); // FIXED

  const plain = sodium.crypto_secretbox_open_easy(cipher, nonce, key);

  if (!plain) throw new Error("Decryption failed");

  return Buffer.from(plain).toString("utf8");
}