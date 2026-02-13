import sys
import json


def add_numbers(a, b):
    return a + b


if __name__ == "__main__":
    try:
        # Read arguments passed from Node.js
        num1 = int(sys.argv[1])
        num2 = int(sys.argv[2])
        result = add_numbers(num1, num2)
        # Print the result to standard output as a JSON string
        print(json.dumps({"result": result}))
        sys.stdout.flush()  # Ensure data is sent immediately
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.stdout.flush()
