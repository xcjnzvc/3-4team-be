-- CreateTable
CREATE TABLE "StartUp" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "actualInvest" INTEGER NOT NULL DEFAULT 0,
    "simInvest" INTEGER NOT NULL DEFAULT 0,
    "revenue" INTEGER NOT NULL DEFAULT 0,
    "employees" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StartUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockInvestor" (
    "id" SERIAL NOT NULL,
    "startUpId" INTEGER NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "investAmount" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "password" VARCHAR(40) NOT NULL,

    CONSTRAINT "MockInvestor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(20) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StartUp" ADD CONSTRAINT "StartUp_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockInvestor" ADD CONSTRAINT "MockInvestor_startUpId_fkey" FOREIGN KEY ("startUpId") REFERENCES "StartUp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
