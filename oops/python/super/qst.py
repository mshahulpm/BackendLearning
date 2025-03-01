class Root:
    def f(self):
        print('Root.f()')

class A(Root):
    def f(self):
        print('A.f()')
        super().f()

a = A()
a.f()