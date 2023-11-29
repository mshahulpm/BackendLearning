-- CreateTable
CREATE TABLE "Population" (
    "id" SERIAL NOT NULL,
    "cilityId" INTEGER NOT NULL,

    CONSTRAINT "Population_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Population" ADD CONSTRAINT "Population_cilityId_fkey" FOREIGN KEY ("cilityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
