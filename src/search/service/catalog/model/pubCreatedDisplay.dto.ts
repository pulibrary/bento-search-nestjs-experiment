import { Type } from 'class-transformer';
import { PubCreatedDisplayAttributes } from './pubCreatedDisplayAttributes.dto';

export class PubCreatedDisplay {
  @Type(() => PubCreatedDisplayAttributes)
  attributes: PubCreatedDisplayAttributes;
}
