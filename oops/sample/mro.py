def what_is_mro():
    class Root:
        f = "Root"

    class Root2:
        f = "Root 2"

    class A(Root):
        f = "A"

    class B(Root2):
        f = "B"

    class C(A, B):
        f = "C"

    c = C()
    print(c.f)
    print(C.__mro__)
    print([cls.__name__ for cls in C.__mro__])


what_is_mro()
