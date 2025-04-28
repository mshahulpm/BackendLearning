-- AddForeignKey
ALTER TABLE "checkpoint_submission" ADD CONSTRAINT "checkpoint_submission_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("challenge_id") ON DELETE RESTRICT ON UPDATE CASCADE;
