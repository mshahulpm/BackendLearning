-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "CompanyCodeNo" SERIAL NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge" (
    "challenge_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("challenge_id")
);

-- CreateTable
CREATE TABLE "challenge_checkpoint" (
    "checkpoint_no" INTEGER NOT NULL,
    "challenge_id" TEXT NOT NULL,

    CONSTRAINT "challenge_checkpoint_pkey" PRIMARY KEY ("challenge_id","checkpoint_no")
);

-- CreateTable
CREATE TABLE "checkpoint_submission" (
    "user_id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,
    "checkpoint_no" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "checkpoint_submission_pkey" PRIMARY KEY ("challenge_id","checkpoint_no","user_id")
);

-- AddForeignKey
ALTER TABLE "challenge_checkpoint" ADD CONSTRAINT "challenge_checkpoint_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("challenge_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoint_submission" ADD CONSTRAINT "checkpoint_submission_challenge_id_checkpoint_no_fkey" FOREIGN KEY ("challenge_id", "checkpoint_no") REFERENCES "challenge_checkpoint"("challenge_id", "checkpoint_no") ON DELETE RESTRICT ON UPDATE CASCADE;
