# Snarktank

Playing with zkSNARKs.

# Commands

Compile circuit:

```bash
# NOTE: This is necessary only for circuits with "../node_modules" includes.

DIR="$(basename $(pwd))"
pushd ..
npx circom2 $DIR/circuit.circom --r1cs --wasm --sym -o $DIR
popd

# OR, for circuits with no dependencies

npx circom2 circuit.circom --r1cs --wasm --sym
```

Powersoftau ceremony:

- As long as any of the contributions are secret, this is secure?
- TODO: Use -e flag in "contribute" command to provide entropy bits

```bash
npx snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
npx snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="Some name" -v
npx snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v
npx snarkjs powersoftau verify pot12_final.ptau
```

## GROTH16

- TODO: Add a contribution from a random beacon?

Create circuit zkey and verification key:

```bash
npx snarkjs groth16 setup circuit.r1cs pot12_final.ptau circuit_0000.zkey
npx snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="Some name" -v
npx snarkjs zkey verify circuit.r1cs pot12_final.ptau circuit_0001.zkey
npx snarkjs zkey export verificationkey circuit_0001.zkey verification_key.json
```


Generate proof and public inputs/outputs:

```bash
npx snarkjs wtns calculate circuit_js/circuit.wasm input.json witness.wtns
npx snarkjs groth16 prove circuit_0001.zkey witness.wtns proof.json public.json

# OR

npx snarkjs groth16 fullprove input.json circuit_js/circuit.wasm circuit_0001.zkey proof.json public.json
```

Verify the proof:

```bash
npx snarkjs groth16 verify verification_key.json public.json proof.json
```

Check that an invalid input will not work:

```bash
npx snarkjs groth16 verify verification_key.json fake_public.json proof.json
```


## PLONK

```bash
npx snarkjs plonk setup circuit.r1cs pot12_final.ptau circuit_final.zkey
npx snarkjs zkey export verificationkey circuit_final.zkey verification_key.json
```

Generate proof and public inputs/outputs:

```bash
npx snarkjs wtns calculate circuit_js/circuit.wasm input.json witness.wtns
npx snarkjs plonk prove circuit_final.zkey witness.wtns proof.json public.json

# OR

npx snarkjs plonk fullprove input.json circuit_js/circuit.wasm circuit_final.zkey proof.json public.json
```

Verify the proof:

```bash
npx snarkjs plonk verify verification_key.json public.json proof.json
```

Check that an invalid input will not work:

```bash
npx snarkjs plonk verify verification_key.json fake_public.json proof.json
```

