-- CreateTable
CREATE TABLE "public"."Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
