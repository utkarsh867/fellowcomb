# Migration `20201119172429`

This migration has been generated by --replace-all at 11/20/2020, 1:24:29 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ALTER COLUMN "discord_id" DROP NOT NULL,
ALTER COLUMN "discord_access_code" DROP NOT NULL

CREATE TABLE "UserSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

ALTER TABLE "UserSession" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201119153813..20201119172429
--- datamodel.dml
+++ datamodel.dml
@@ -3,20 +3,27 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
-  id                  String    @id @default(cuid())
-  username            String    @unique
+  id                  String        @id @default(cuid())
+  username            String        @unique
   name                String
-  createdAt           DateTime  @default(now())
-  updatedAt           DateTime  @default(now())
+  createdAt           DateTime      @default(now())
+  updatedAt           DateTime      @default(now())
   deletedAt           DateTime?
   github_access_code  String
   linkedin            String?
   calendly            String?
-  discord_id          String
-  discord_access_code String
+  discord_id          String?
+  discord_access_code String?
+  UserSessions        UserSession[]
 }
+
+model UserSession {
+  id     String @id @default(cuid())
+  user   User   @relation(fields: [userId], references: [id])
+  userId String
+}
```

