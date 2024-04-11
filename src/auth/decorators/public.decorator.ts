import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from "src/constants/key-decorator";

export const PublicAcces = () => SetMetadata(PUBLIC_KEY, true)