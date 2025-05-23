import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
/* types */
import type { Crop } from '@/types';
import type { ChangeEvent, DragEvent } from 'react';
/* components */
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
/* icons */
import { Leaf, Send, Upload, X } from 'lucide-react';

interface AnalysisSubmitData {
  cropId: string;
  description: string;
  imageFile: File | null;
}

interface NewAnalysisProps {
  crops: Crop[];
  setSelectedTab: (tab: string) => void;
}

const NewAnalysis = ({ crops, setSelectedTab }: NewAnalysisProps) => {
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    cropId?: string;
    image?: string;
    description?: string;
  }>({});
  const [selectedCrop, setSelectedCrop] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          image: 'A imagem não pode ser maior que 10MB',
        }));
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setValidationErrors(prev => ({
          ...prev,
          image: 'Formato de arquivo não suportado',
        }));
        return;
      }

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));

      if (validationErrors.image) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          image: 'A imagem não pode ser maior que 10MB',
        }));
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setValidationErrors(prev => ({
          ...prev,
          image: 'Formato de arquivo não suportado',
        }));
        return;
      }

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));

      if (validationErrors.image) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Function to send analysis
  // Função aprimorada para enviar análises para uma API
  const handleSendAnalysis = async (): Promise<void> => {
    try {
      // Validação do formulário
      const errors: Record<string, string> = {};
      if (!selectedCrop) {
        errors.cropId = 'Selecione uma safra';
      }
      if (!selectedImage) {
        errors.image = 'Uma imagem é obrigatória';
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      // Limpar erros de validação
      setValidationErrors({});
      setIsSubmitting(true);

      // Prepara os dados para envio
      const submitData: AnalysisSubmitData = {
        cropId: selectedCrop,
        description: description,
        imageFile: selectedImage,
      };

      // Log dos dados que serão enviados
      // console.log('Preparando para enviar análise:', submitData);

      // Preparar FormData para envio de arquivos
      const formData = new FormData();
      formData.append('cropId', selectedCrop);
      formData.append('description', description);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      // Envio para API real
      // const response = '';

      // Reset dos campos após envio bem-sucedido
      setSelectedImage(null);
      setImagePreview(null);
      setDescription('');
      setSelectedCrop('');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.success('Análise enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar análise:', error);
      toast.error('Erro ao enviar análise. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {!crops || crops.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Nenhuma safra cadastrada.
          </p>
          <Button className="bg-betia-green hover:bg-betia-green/90" asChild>
            <Button
              className="bg-betia-green hover:bg-betia-green/90"
              onClick={() => setSelectedTab('culturas')}
              size="sm"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Cadastrar nova cultura
            </Button>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="crop">Selecione a Safra</Label>
            <Select
              value={selectedCrop}
              onValueChange={value => {
                setSelectedCrop(value);
                if (validationErrors.cropId) {
                  setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.cropId;
                    return newErrors;
                  });
                }
              }}
            >
              <SelectTrigger
                className={validationErrors.cropId ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Selecione uma safra" />
              </SelectTrigger>
              <SelectContent>
                {crops.map(crop => (
                  <SelectItem key={crop.id} value={crop.id}>
                    {crop.name} ({crop.culture})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationErrors.cropId && (
              <p className="text-sm text-red-500 mt-1">
                {validationErrors.cropId}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva os sintomas ou problemas observados na planta..."
              className="min-h-[100px]"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div
            className={`flex flex-col items-center justify-center border-2 ${
              validationErrors.image ? 'border-red-500' : 'border-dashed'
            } rounded-md p-12 cursor-pointer hover:bg-muted/50 relative`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />

            {imagePreview ? (
              <div className="relative w-full max-w-md">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <img
                    src={
                      imagePreview ||
                      'images/placeholder.svg?height=300&width=400&query=plant'
                    }
                    alt="Imagem para diagnóstico"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-center mt-2">
                  {selectedImage?.name}
                </p>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <Button
                  className="bg-betia-green hover:bg-betia-green/90 mb-2"
                  onClick={e => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Enviar Imagem
                </Button>
                <p className="text-sm text-muted-foreground">
                  ou arraste e solte sua imagem aqui
                </p>
              </>
            )}
          </div>
          {validationErrors.image && (
            <p className="text-sm text-red-500">{validationErrors.image}</p>
          )}

          <div className="text-sm text-muted-foreground">
            <p>Formatos aceitos: JPG, PNG, WEBP</p>
            <p>Tamanho máximo: 10MB</p>
            <p>
              Dica: Tire fotos bem iluminadas e focadas na área afetada da
              planta para obter um diagnóstico mais preciso.
            </p>
          </div>
        </>
      )}

      <div className="flex justify-start mb-4">
        <Button
          className="bg-betia-green hover:bg-betia-green/90"
          onClick={handleSendAnalysis}
          disabled={!selectedImage || !selectedCrop || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Enviar Análise
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewAnalysis;
