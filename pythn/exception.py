# raise Exception("you are not good enough")

# raise FileExistsError("file already here ")


# handle exception
try:
    x = 7 / 0
except Exception as e:
    print(e)
finally:
    print("block run anyway")
