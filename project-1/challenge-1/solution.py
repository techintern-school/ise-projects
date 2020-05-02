#!/usr/bin/env python
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--brand')
parser.add_argument('--discount')
args = parser.parse_args()
print(args.brand)