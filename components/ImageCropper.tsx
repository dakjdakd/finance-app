'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Point, Area } from 'react-easy-crop/types'

interface ImageCropperProps {
  image: string
  aspectRatio?: number
  onCropComplete: (croppedImage: string) => void
  onCancel: () => void
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.src = url
  })

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area
): Promise<string> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return canvas.toDataURL('image/jpeg')
}

export default function ImageCropper({
  image,
  aspectRatio = 1,
  onCropComplete,
  onCancel
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const handleCropComplete = useCallback(
    async (_: Area, croppedAreaPixels: Area) => {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels)
        onCropComplete(croppedImage)
      } catch (e) {
        console.error(e)
      }
    },
    [image, onCropComplete]
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white">
        <div className="relative h-80">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-600">缩放</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
            >
              取消
            </button>
            <button
              onClick={() => handleCropComplete({ width: 0, height: 0, x: 0, y: 0 }, { width: 0, height: 0, x: 0, y: 0 })}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-black/90"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
