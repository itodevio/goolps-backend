import { Router } from 'express';

import Pedidos from './Pedidos';
import Produtos from './Produtos';
import Ingredientes from './Ingredientes';

const router = Router();

router.use('/pedidos', Pedidos);
router.use('/produtos', Produtos);
router.use('/ingredientes', Ingredientes);

export default router;