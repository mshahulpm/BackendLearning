from abc import ABC

# 3. Liskov Substitution Principle (LSP):


class Bird(ABC):

    def isBird(self):
        return True


def checkBird(b: Bird):
    return b.isBird()


# violation of 3
class Penguin(Bird):

    # this should violate principle 3
    def isBird(self):
        raise NotImplementedError(
            "Penguins are birds, but this method is not implemented."
        )


# example
checkBird(Penguin())  # will throw error

# ---------------------------- correct implementation ------------------------------


class Penguin2(Bird):

    #    avoid the implementation of isBird function if not necessary

    # or
    def isBird(self):
        return False

    def swim(self):
        return True


checkBird(Penguin2())  # no issue
