pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/mimcsponge.circom";

template Hash() {
  signal input address;
  signal input inputData;
  signal output hashData;

  component h = MiMCSponge(1, 220, 1);
  h.ins[0] <== inputData;
  h.k <== 0;
  hashData <== h.outs[0];
}

component main {public [address]} = Hash();

