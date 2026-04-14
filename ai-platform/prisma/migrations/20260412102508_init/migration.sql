-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moduleId" TEXT NOT NULL,
    "moduleType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "inputData" TEXT NOT NULL,
    "outputData" TEXT NOT NULL,
    "memo" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Record_moduleId_idx" ON "Record"("moduleId");

-- CreateIndex
CREATE INDEX "Record_moduleType_idx" ON "Record"("moduleType");

-- CreateIndex
CREATE INDEX "Record_createdAt_idx" ON "Record"("createdAt");
