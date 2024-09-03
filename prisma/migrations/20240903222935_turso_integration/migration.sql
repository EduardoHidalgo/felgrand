-- CreateTable
CREATE TABLE "StoredCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "archetype" TEXT,
    "banType" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "importance" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "race" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StoredCardItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "condition" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "rarityCode" TEXT,
    "setCode" TEXT,
    "setName" TEXT,
    "status" TEXT NOT NULL,
    "storageGroup" TEXT,
    "boughtValue" DECIMAL NOT NULL,
    "count" INTEGER NOT NULL,
    "value" DECIMAL NOT NULL,
    "wantedCount" INTEGER NOT NULL,
    "storedCardId" INTEGER NOT NULL,
    CONSTRAINT "StoredCardItem_storedCardId_fkey" FOREIGN KEY ("storedCardId") REFERENCES "StoredCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CTPrices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "betterPrice" DECIMAL,
    "marketPrice" DECIMAL,
    "minPrice" DECIMAL,
    "cardName" TEXT NOT NULL,
    "setName" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "storedCardItemId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CTPrices_storedCardItemId_fkey" FOREIGN KEY ("storedCardItemId") REFERENCES "StoredCardItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CTPrices_id_key" ON "CTPrices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CTPrices_storedCardItemId_key" ON "CTPrices"("storedCardItemId");
